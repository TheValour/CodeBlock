import { LineChart } from '@mui/x-charts/LineChart';
import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../../context/api';

export default function Question() {
    const { uid, userCalendar } = useContext(APIContext);
    const [cal, setCal] = useState<any>(null);
    const [value, setValue] = useState<string>('1');
    const [myData, setMyData] = useState<number[]>([]);

    // Fetch calendar data when `uid` changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const con = await userCalendar(uid ? uid : '', '2024');
                setCal(con.data.data.matchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [uid]);

    useEffect(() => {
        if (cal) {
            const final = JSON.parse(cal.userCalendar.submissionCalendar);
            const objectArray = Object.entries(final).map(([, count]) => Number(count));

            if (value === '1') {
                setMyData(objectArray.slice(-7)); // Last 7 days for "Week"
                console.log(myData)
            } else if (value === '2') {
                setMyData(objectArray.slice(-15)); // Last 15 days
            } else if (value === '3') {
                setMyData(objectArray.slice(-30)); // Last 30 days (Month)
            } else if (value === '4') {
                setMyData(objectArray); // All data for "Year"
            }
        }
    }, [cal, value]);

    return (
        <div className='flex justify-end'>
            {/* LineChart */}
            <LineChart
                xAxis={[{ data: Array.from({ length: myData.length }, (_, i) => i+1 ) }]}
                series={[{ data: myData }]}
                yAxis={[{min:0}]}
                width={600}
                height={300}
            />

            {/* Dropdown */}
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="1">Week</option>
                <option value="2">15 days</option>
                <option value="3">Month</option>
                <option value="4">Year</option>
            </select>
        </div>
    );
}
