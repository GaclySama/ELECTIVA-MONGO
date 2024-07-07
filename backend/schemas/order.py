def order_schema( user ) -> dict:
    
    arr_product = []

    for product in user["order"]:
      arr = {
          "id": product["id"],
          "title": product["title"],
          "qty": product["qty"],
          "price": product["price"]
      }
      arr_product.append(arr)

    list_products = {
        "orderId": user["orderId"] ,
        "createdAt": user["createdAt"] ,
        "orderStatus": user["orderStatus"] ,
        "amount": user["amount"] ,
        "products": arr_product,
    }

    return list_products