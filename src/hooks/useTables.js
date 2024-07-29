import { useState, useEffect } from 'react';
import { fetchOpenTables, fetchClosedTables, fetchOpenTablesForRestaurant } from '../utils/apiService';

const useTables = (userId, viewMode) => {
    const [openTables, setOpenTables] = useState([]);
    const [closedTables, setClosedTables] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTables = async () => {
            setIsLoading(true);
            setError('');
            try {
                let data = [];
                if (viewMode === 'closedTables') {
                    data = await fetchClosedTables(userId);
                    setClosedTables(data);
                } else if (viewMode === 'openTables') {
                    data = await fetchOpenTablesForRestaurant(userId);
                    setOpenTables(data);
                } else {
                    data = await fetchOpenTables(userId);
                    setOpenTables(data);
                }
            } catch (e) {
                setError('Failed to load tables: ' + e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTables();
    }, [userId, viewMode]);

    return {
        openTables,
        setOpenTables,
        closedTables,
        setClosedTables,
        isLoading,
        error
    };
};

export default useTables;
