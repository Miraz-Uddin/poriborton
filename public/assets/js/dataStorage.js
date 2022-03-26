const dataStorage = {
    fromAmount: '',
    toAmount: '',
    apiKey: '',
    set fromUnit(amount){this.fromAmount = amount},
    set toUnit(amount){this.toAmount = amount},
    set apiSecret(value){this.apiKey = value},
    async fetchAllcountries(){
        const getResponse = await fetch(`https://free.currconv.com/api/v7/countries?&apiKey=${this.apiKey}`)
        return await getResponse.json()
    }
}

export default dataStorage