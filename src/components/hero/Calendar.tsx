import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../../context/api";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function Calendar() {
    const { uid, userCalendar } = useContext(APIContext);
    const [cal, setCal] = useState<any>(null);  
    const [dateVals, setDateVals] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>("2024"); 

    // Helper functions
    const convertToDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toISOString().split('T')[0];
    };

    const findLevel = (count: number) => {
        if(count > 15 ) return 4;
        if (count > 8) return 3;
        if (count >= 4) return 2;
        if (count >= 1) return 1;
        return 0;
    };

    useEffect(() => {
        const fetchUserCalendar = async () => {
            try {
                const con = await userCalendar(uid ? uid : '', selectedYear);
                const matchedUser = con.data.data.matchedUser;

                if (matchedUser && matchedUser.userCalendar && matchedUser.userCalendar.submissionCalendar) {
                    const final = JSON.parse(matchedUser.userCalendar.submissionCalendar);
                    const objectArray = Object.entries(final).map(([timestamp, count]) => ({
                        date: convertToDate(Number(timestamp)),
                        count: Number(count),
                        level: findLevel(Number(count)),
                    }));
                    setDateVals(objectArray);  
                } else {
                    setDateVals([]);  
                }

                setCal(matchedUser); 
            } catch (error) {
                console.error("Error fetching user calendar:", error);
            }
        };

        if (uid) {
            fetchUserCalendar();
        }
    }, [uid, selectedYear, userCalendar]);  

    const minimalTheme: ThemeInput = {
        // light: ['#fff', '#c4edde', '#7ac7c4', '#f73859'],
        light: ['#161b22', '#0e4429', '#03803d', '#39d353', "#d43838"],
        dark: ['#161b22', '#0e4429', '#03803d', '#39d353', "red"],
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value); 
    };

    if (!cal) return <div>Loading...</div>; 

    return (
        <div className="BG_BLACK text-white flex justify-center items-start p-4 HEIGHT30 MIN-85">
            {dateVals.length > 0 ? (
                <>
                    <ActivityCalendar
                        data={dateVals}
                        maxLevel={4}
                        blockSize={13}
                        theme={minimalTheme}
                        renderBlock={(block, activity) =>
                            React.cloneElement(block, {
                                'data-tooltip-id': 'react-tooltip',
                                'data-tooltip-html': `${activity.count} activities on ${activity.date}`
                            })
                        }
                    />
                    <ReactTooltip id="react-tooltip" />
                </>
            ) : (
                <div className="bg-green-600 p-3 rounded-md">Journey started after {selectedYear} ...</div>
            )}

            <select
                className="m-4 text-black rounded-md bg-slate-300"
                value={selectedYear}
                onChange={handleYearChange}
            >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
            </select>
        </div>
    );
}
