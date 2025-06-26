import { LineChart } from '@mui/x-charts/LineChart';
import { useContext, useEffect, useState } from 'react';
import { APIContext } from '../../context/api';
import { axisClasses } from '@mui/x-charts';

export default function Question() {
    const { uid, userCalendar } = useContext(APIContext);
    const [cal, setCal] = useState(null);
    const [value, setValue] = useState('1');
    const [myData, setMyData] = useState([]);

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
        <div className='BGGRAY text-white flex justify-end'>
            {/* LineChart */}
            <LineChart
                sx={() => ({
                    [`.${axisClasses.root}`]: {
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                          stroke: '#fff',
                          strokeWidth: 2,
                        },
                        [`.${axisClasses.tickLabel}`]: {
                          fill: '#fff',
                        },
                    },
                    
                    // border: '4px solid red',
                    // ...theme.applyStyles('dark', {
                    //     borderColor: 'rgba(255,255,255, 0.1)',
                    // }),
                })}
                xAxis={[
                    {
                        data: Array.from({ length: myData.length }, (_, i) => i + 1),
                        label:"no. of days" ,
                        labelStyle:{
                            stroke: '#fff',
                        },
                        labelFontSize:13
                    },
                ]}
                yAxis={[
                    {
                        min: 0,
                        label: "no. of questions",
                        labelStyle:{
                            stroke: '#fff',
                        },
                        labelFontSize:13
                    },
                ]}
                series={[{ data: myData }]}
                width={700}
                height={300}
                colors={['blue']}
            />


            {/* Dropdown */}
            <select value={value} onChange={(e) => setValue(e.target.value)} className='text-black h-10 mt-16'>
                <option value="1">Week</option>
                <option value="2">15 days</option>
                <option value="3">Month</option>
                <option value="4">Year</option>
            </select>
        </div>
    );
}
