async function getStockData() {
    const stock = document.getElementById('stock').value.toUpperCase();
    if (!stock) return alert("Please enter a stock symbol");

    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=defaultKeyStatistics,financialData,summaryDetail,price`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract key metrics
        const quote = data.quoteSummary.result[0];

        document.getElementById('beta').innerText = 
            "Beta: " + (quote.defaultKeyStatistics.beta ? quote.defaultKeyStatistics.beta.raw : "N/A");

        document.getElementById('stddev').innerText = 
            "Standard Deviation: N/A (Requires historical data)";

        document.getElementById('annualized').innerText = 
            "Annualized Returns: N/A (Requires historical data)";

        document.getElementById('marketcap').innerText = 
            "Market Cap: " + (quote.price.marketCap ? quote.price.marketCap.fmt : "N/A");

        document.getElementById('pe').innerText = 
            "P/E Ratio: " + (quote.summaryDetail.trailingPE ? quote.summaryDetail.trailingPE.fmt : "N/A");

        document.getElementById('dividend').innerText = 
            "Dividend Yield: " + (quote.summaryDetail.dividendYield ? (quote.summaryDetail.dividendYield.raw*100).toFixed(2) + "%" : "N/A");

        document.getElementById('sector').innerText = 
            "Sector comparison: N/A (Requires additional API or manual input)";

    } catch(err) {
        alert("Error fetching stock data. Check the symbol or try later.");
        console.error(err);
    }
}
