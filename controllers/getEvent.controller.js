const axios = require('axios');

const sendGraphQLRequest = async (query) => {
    try {
        const response = await axios.post('https://api.saralpatro.com/graphql', { query });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.data; 
    } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.statusText : error.message}`);
    }
};

const generateGraphQLQuery = () => {
    const currentYear = new Date().getFullYear() + 57;
    return `
    query {
        dates(bsYear: ${currentYear}) {
            bsDay
            bsMonth
            bsYear
            adDay
            adMonth
            adYear
            isHoliday
            events {
                strEn
                strNp
                isHoliday
            }
        }
    }`;
};


const getEventsByQuery = async (req, res) => {
    const query = generateGraphQLQuery();
    const { search } = req.query;
    try {
        const data = await sendGraphQLRequest(query);

        if (search) {
            const filteredData = data.data.dates.filter(date =>
                date.events.some(event =>
                    event.strEn.toLowerCase().includes(search.toLowerCase())
                )
            );
            return res.json({ dates: filteredData });
        }

        return res.json(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getTodayEvent = async (req, res) => {
    const today = new Date();
    const adDay = today.getDate();
    const adMonth = today.getMonth() + 1;
    const adYear = today.getFullYear();

    const query = generateGraphQLQuery();

    try {
        const data = await sendGraphQLRequest(query);

        const todayEvents = data.data.dates.find(date =>
            date.adDay === adDay &&
            date.adMonth === adMonth &&
            date.adYear === adYear
        );

        if (todayEvents && todayEvents.events.length > 0) {
            return res.json({ events: todayEvents.events });
        } else {
            return res.json({ message: "No events for today." });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getMonthlyEvent = async (req, res) => {
    const today = new Date();
    const adMonth = today.getMonth() + 1;

    const query = generateGraphQLQuery();

    try {
        const data = await sendGraphQLRequest(query);

        const combinedEvents = data.data.dates
            .filter((date) => date.adMonth === adMonth)
            .map((event) => event.events.length > 0 ? event : null)
            .filter(Boolean);

        return res.json({ events: combinedEvents });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = {
    getEventsByQuery,
    getTodayEvent,
    getMonthlyEvent,
};
