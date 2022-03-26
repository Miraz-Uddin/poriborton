const dataStorage = {
    fromCountryID: '',
    toCountryID: '',
    apiKey: '',
    set fromCurrency(currency){this.fromCountryID = currency},
    set toCurrency(currency){this.toCountryID = currency},
    set apiSecret(value){this.apiKey = value},
    async fetchAllcountries(){
        const getResponse = await fetch(`https://free.currconv.com/api/v7/countries?&apiKey=${this.apiKey}`)
        return await getResponse.json()
    },
    async fetchRate(){
        const getResponse = await fetch(`https://free.currconv.com/api/v7/convert?q=${this.fromCountryID}_${this.toCountryID},${this.toCountryID}_${this.fromCountryID}&compact=ultra&apiKey=${this.apiKey}`)
        return await getResponse.json()
    }
}

export default dataStorage