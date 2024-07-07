export default regExp = {
    regEmail: /^(?=.{10,30}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/,
    regPassword: /^(?=.*[0-9])(?=.*[!@#$%^&*_])\S{6,16}$/,
    regName: /^(?!.*(?:[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4}|[aeiouAEIOUáéíóúÁÉÍÓÚ]{4}))(?:[A-Za-záéíóúÁÉÍÓÚüÜñÑ]{3,10}(?:[ ][A-Za-záéíóúÁÉÍÓÚüÜñÑ]{3,10})?)$/,
};