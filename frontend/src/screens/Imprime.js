import {Button, View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Header from '../common/Header';
import {useSelector} from 'react-redux';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useRoute } from '@react-navigation/native';

const Imprime = ({navigation}) => {
  const route = useRoute();
  const orders = route.params?.orders;
  //variables por defecto
  /* const ordersList = useSelector(state => state.order);
  console.log(ordersList); */

  const datoss = JSON.parse(JSON.stringify(orders));
  
  let tablaFinal = '';
  let tablaFecha = '';
  let tablaFmonto = '';
  let TablaForderId = '';

  const tabla2 = (index) => {
    /* let tabla = ''; */ // Variable para almacenar el contenido de la tabla
    
    let valor2 = (index === undefined) ? 0 : index;

    console.log(valor2);
    
    if (datoss.length > 0 ) {

      //variable de monto
      let orderId = datoss[valor2].orderId;

      //variable de monto
      let monto = datoss[valor2].amount;

      //variable de fecha
      let fecha = datoss[valor2].createdAt;

      TablaForderId = `<td><span>${orderId}</span></td>`
      tablaFmonto = `<td><span>${monto}</span></td>`
      tablaFecha = `<td><span>${fecha}</span></td>`

      //Reseto de tabla
      tablaFinal = '';

      //Creacion de nueva tabla
      datoss[valor2].products.map((item, index) => {
      // Accede a las propiedades de cada elemento del array
      let nombre = item.title;
      let cantidad = item.qty;
      let precio = item.price;

      // Agrega una fila a la tabla con los datos del item
      tablaFinal += `
        <tr>
          <td><span>${nombre}</span></td>
          <td><span>${cantidad}</span></td>
          <td><span id="prefix">$</span><span>${precio}</span></td>
        </tr>
      `;
  
      // Realiza las operaciones deseadas con los datos
      console.log(`Item ${index + 1}: ${nombre}, Cantidad: ${cantidad}, Precio: ${precio}`);
    })
  };
  
     // Retorna el contenido de la tabla
  };

  tabla2();

  const data = {
    name: 'Nemesis Store',
    address: 'Centro cívico, San Cristobal Edo. Tachira',
    phone: 'Telefono: 424-9008671',
  }


  //formato PDF en html
  const html = () =>`
    <html>
          <head>
            <meta charset="utf-8">
            <title>Invoice</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Solicitud de compra</h1>
              
            </header>
            <article>
              <address>

                <img
                src="https://i.postimg.cc/hvHn1FKv/Nemesis-Store.png"
                width="80px" height="80px"
                />

                <br>
                <br>

                <p>${data.name}</p>
                <p>${data.address}</p>
                <p>${data.phone}</p>
                
              </address>
              <table class="meta">
                <tr>
                  <th><span>Factura #</span></th>
                  ${TablaForderId}
                </tr>
                <tr>
                  <th><span>Fecha</span></th>
                  ${tablaFecha}
                </tr>
                <tr>
                  <th><span>Monto a Pagar</span></th>
                  ${tablaFmonto}
                </tr>
              </table>
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Producto</span></th>
                    <th><span>Cantidad</span></th>
                    <th><span>Precio</span></th>
                  </tr>
                </thead>
                <tbody>
                  ${tablaFinal}
                </tbody>
              </table>
              <table class="balance">
                
                <tr>
                  <th><span>Monto a Pagar</span></th>
                  ${tablaFmonto}
                </tr>
              </table>
            </article>
            <aside>
              <h1><span>Notas adicionales</span></h1>
              <div>
                <p>Nan</p>
              </div>
            </aside>
          </body>
        </html>
`;

//funcion para generar pdf
let generatePdf = async () => {
    const file =  await Print.printToFileAsync({
      html: html(),
      base64: false
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Movimientos de Cuenta'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
        <FlatList
        data={datoss}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.orderItem}>
              
              <FlatList
                data={item.products}
                renderItem={({item, index}) => {
                  return (
                        <View style={styles.orderItem2}>
                          <Text style={{fontWeight:'800'}}>
                            {item.title
                              ? item.title.substring(0, 20)
                              : item.title}
                          </Text>
                            <Text >
                            Cantidad: {item.qty}
                          </Text>
                          <Text>
                            {'$' + item.price}
                          </Text>
                        </View>
                      );
                  }}
              />
              <View style={{padding:20}}>
              <Text><Text style={{fontWeight:'800'}}>Total:</Text> {item.amount}</Text>
              <Text><Text style={{fontWeight:'800'}}>Estatus:</Text> {item.orderStatus}</Text>
              <Text><Text style={{fontWeight:'800'}}>Fecha:</Text> {item.createdAt}</Text>
              </View>

              <View style={{justifyContent:'center', alignItems:'center', bottom:'3%'}}>

              <Pressable style={styles.btnPDF} onPress={() => {  tabla2(index); generatePdf();} }><Text style={styles.btnText}>Generar PDF</Text></Pressable>
              
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderItem2: {
    width: '90%',
    flexDirection: 'colum',
    backgroundColor: '#ecf0f1',
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  orderItem: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#7D7D7DF2',
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  nameView: {
    marginLeft: 10,
  },
  noItems: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPDF: {
    width:150, 
    height:50, 
    borderRadius: 5,
    color:'white',
    backgroundColor:'#3498db', 
    fontWeight:'800',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff'
  }
});

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: 18px;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #130f40; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;

export default Imprime;
