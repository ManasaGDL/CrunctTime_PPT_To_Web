import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
// chart data
import chartData from './Default/chart-data/total-growth-bar-chart'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { date } from 'yup';
import axios from 'axios';

const status = [
  {
    value: 'weekly',
    label: 'Weekly'
  },
  {
    value: 'monthly',
    label: 'Monthly'
  },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
];


// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading ,setLoading,setPopularCardData }) => {
  const [value, setValue] = useState('weekly');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const [weekDate, setWeekDate] = useState(dayjs(new Date()));

const [ monthSelected, setMonthSelected] = useState(dayjs(new Date())
//   {
//   $L: 'en',
//   $u: undefined,
//   $d: new Date(),
//   $y: new Date().getFullYear(),
//   $M: new Date().getMonth()
//   // Add more properties if needed
// }
)//to display Month+year
const [ data , setData] = useState([])
const [parameters , setParameters] = useState([])
const [ paramValues, setparamValues] = useState([])
const [ originalData , setOriginalData] = useState([])
const [ filteredData,setFilteredData] = useState({})
const [monSelected,setMonSelected] = useState()
const [ yearSelected,setYearSelected]= useState()
useEffect(() => {
  setData([])
  const fetchData = async () => {
    
    try {
      if(value==="weekly")
      {const response = await axios.get(`http://localhost:8081/filterdata/${weekDate.format('YYYY-MM-DD')}`);
      setLoading(false)
      setOriginalData(response?.data)
    }
    if(value==="monthly")
    {
      setLoading(false)
      const res = await axios.get(`http://localhost:8081/filterdata/${monSelected}/${yearSelected}`)
      setOriginalData(res?.data)
    }
    } catch (error) {
      if(error?.response)
      console.error('Error fetching data:', error?.response);
    else{
      console.log(error)
    }
    }
  };
setLoading(true)
  fetchData(); // Call the async function to fetch data when component mounts or `weekDate` changes
}, [weekDate,monSelected,yearSelected,value]);

useEffect(()=>{
  setYearSelected(monthSelected.$d.getFullYear())
  setMonSelected(monthSelected.$d.getMonth() + 1)
},[monthSelected])
useEffect(()=>{
  if(data?.length==0)
  {
    setPopularCardData({})
  }
  if(data.length>0 )
  
{ 
  if(value==="weekly") 
 { const totals = data.reduce((accumulator, currentValue) => {
 
    for (const key in currentValue) {
      if (! ['Date','report_id'].includes(key)) { // Exclude the 'Date' field
        accumulator[key] = (accumulator[key] || 0) + currentValue[key];
      }
    }
    return accumulator;
  }, {});
  console.log(totals)
 setParameters(Object.keys(totals))
 setparamValues(Object.values(totals))
 setPopularCardData(totals)
}

if(value==="monthly")
{
  const totals = data.reduce((accumulator, currentValue) => {
 
    for (const key in currentValue) {
      if (! ['Date','report_id'].includes(key)) { // Exclude the 'Date' field
        accumulator[key] = (accumulator[key] || 0) + currentValue[key];
      }
    }
    return accumulator;
  }, {});
  
 setParameters(Object.keys(totals))
 setparamValues(Object.values(totals))
 setPopularCardData(totals)
}
}
},[data])
useEffect(()=>{
  if(originalData?.length ==0)
  {
    setparamValues([])
    setData([])
  }
if(originalData.length>0)
{

if(value==="weekly")
{
  setData([...originalData])
  // setData(Object.keys(originalData[0]).map(key=>{
  //   if(!['Date','report_id'].includes(key))
  //   {
  //     return key
  //   }
  //   else return
  // }))

  setparamValues(Object.keys(originalData[0]).map(key=>{
    if(!['Date','report_id'].includes(key))
    {
      return originalData[0][key]
    }
    else return
  }).filter(val=>val!=undefined))
//  console.log(Object.values("data"))
}
if(value=="monthly")
{
  setData([...originalData])
 
}
}
},[originalData,value])
const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
  
    //   colors: ['#546E7A','#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
    //   '#f48024', '#69d2e7'
    // ]
    // ,
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        distributed:true,
        horizontal: false,
        columnWidth: '50%'
      }
    },
    colors:["#33b2df",
    "#546E7A",
    "#d4526e",
    
    "#A5978B",
    "#2b908f",
    "#f9a3a4",
    "#90ee7e",
    "#f48024",
    "#69d2e7"],
    xaxis: {
      // type: 'category',
      categories:parameters,
         labels: {
        show: false,
      }
      
    },
    legend: {
      show: true,
      fontSize: '12px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 7,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      // name: 'Investment',
      data: paramValues
    },
    // {
    //   name: 'Loss',
    //   data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
    // },
    // {
    //   name: 'Profit',
    //   data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
    // },
    // {
    //   name: 'Maintenance',
    //   data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
    // }
  ]
};
  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
     
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                   
                  </Grid>
                </Grid>
                <Grid item>
                    <Grid item container spacing={2} >
                        
                        <Grid item container md={4}>
                        
                            <Grid item >
                        <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  </Grid>
                  </Grid>
                  <Grid item container md={8} justifyContent="flex-end" alignContent={"flex-end"}>
                       
                        <Grid item >
                        {value==="weekly"?<DatePicker  
                        // label={'"year", "month" and "day"'} 
                        disableFuture
  // views={['year', 'month', 'day']}
  format='YYYY-MM-DD'
    value={weekDate}
  
   onChange={(e)=>setWeekDate(dayjs(new Date(e)))}
   // setWeekDate(moment(new Date(weekDate)).format('YYYY-MM-DD'))
  
  sx={{"width":'100%'}}
  />:<DatePicker 
 value={monthSelected}
 disableFuture
 onChange={(e)=>{
 console.log(e)
 setYearSelected(e.$d.getFullYear())
 setMonSelected(e.$d.getMonth() + 1)
  setMonthSelected(e)}} sx={{ 'width':'100%'}}
  label={'"month" and "year"'} views={['month', 'year']} />
                    }
                        </Grid>
                        </Grid>
                    </Grid>
                 
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
       
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
