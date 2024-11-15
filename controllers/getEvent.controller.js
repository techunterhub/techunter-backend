const axios = require('axios');
const NodeCache = require('node-cache');
const asyncHandler = require('express-async-handler');
const cache = new NodeCache({ stdTTL: 600 });

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
}

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
}

const generateTwoYearGraphQLQuery = () => {
    const currentYear = new Date().getFullYear() + 57; // Convert current AD year to BS year
    return `
    query {
        firstYearEvents: dates(bsYear: ${currentYear}) {
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
        secondYearEvents: dates(bsYear: ${currentYear + 1}) {
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
}

const isEventFuture = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate.adYear, eventDate.adMonth - 1, eventDate.adDay);
    return event > today;
}

const getEventsByQuery = asyncHandler(async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ error: 'Search query is required.' });
    }

    const query = generateTwoYearGraphQLQuery();

    try {
        const cacheKey = 'two_year_events_data';
        let data = cache.get(cacheKey);

        if (!data) {
            data = await sendGraphQLRequest(query);
            cache.set(cacheKey, data);
        }

        const combinedDates = [...data.data.firstYearEvents, ...data.data.secondYearEvents];

        const uniqueEvents = new Set();
        const filteredData = [];


        combinedDates.forEach(date => {
            date.events.forEach(event => {
                if (event.strEn.toLowerCase().includes(search.toLowerCase()) && isEventFuture(date)) {
                    if (!uniqueEvents.has(event?.strEn)) {
                        uniqueEvents.add(event?.strEn);
                        filteredData.push(date);
                    }
                }
            });
        });

        return res.json({ dates: filteredData });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
});


const getTodayEvent = asyncHandler(async (req, res) => {
    const today = new Date();
    const adDay = today.getDate();
    const adMonth = today.getMonth() + 1;
    const adYear = today.getFullYear();

    const query = generateGraphQLQuery();

    try {
        const cacheKey = 'events_data';
        let data = cache.get(cacheKey);

        if (!data) {
            data = await sendGraphQLRequest(query);
            cache.set(cacheKey, data);
        }

        const todayEvents = data.data.dates.find(date =>
            date.adDay === adDay &&
            date.adMonth === adMonth &&
            date.adYear === adYear
        );

        if (todayEvents) {
            return res.json({ events: todayEvents });
        } else {
            return res.json({ message: "No events for today." });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
})

const getMonthlyEvent = asyncHandler(async (req, res) => {
    const today = new Date();
    const adMonth = today.getMonth() + 1;
    const nextMonth = adMonth === 12 ? 1 : adMonth + 1;

    const query = generateGraphQLQuery();

    try {
        const cacheKey = 'events_data';
        let data = cache.get(cacheKey);

        if (!data) {
            data = await sendGraphQLRequest(query);
            cache.set(cacheKey, data);
        }

        const combinedEvents = data.data.dates
            .filter((date) => date.adMonth === adMonth || date.adMonth === nextMonth)
            .map((event) => event.events.length > 0 ? event : null)
            .filter(Boolean);

        return res.json({ events: combinedEvents });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
})

const getEventByMonth = asyncHandler(async (req, res) => {
    const { month } = req.query;
    const adMonth = parseInt(month, 10);

    if (isNaN(adMonth) || adMonth < 1 || adMonth > 12) {
        return res.status(400).json({ error: 'Invalid month parameter. It must be a number between 1 and 12.' });
    }

    const query = generateGraphQLQuery();

    try {
        const cacheKey = 'events_data';
        let data = cache.get(cacheKey);

        if (!data) {
            data = await sendGraphQLRequest(query);
            cache.set(cacheKey, data);
        }

        const nextMonth = adMonth === 12 ? 1 : adMonth + 1;
        const combinedEvents = data.data.dates
            .filter((date) => date.adMonth === adMonth || date.adMonth === nextMonth)
            .map((event) => event.events.length > 0 ? event : null)
            .filter(Boolean);
        return res.json({ events: combinedEvents });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
})


module.exports = {
    getEventsByQuery,
    getTodayEvent,
    getMonthlyEvent,
    getEventByMonth
};

