import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import Card from '@mui/material/Card';
import TruncatedChip from './TruncatedChip';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useContext } from 'react';
import { weekContext ,Context} from 'context/Context';
import { mappingNames } from 'constants';
// assets


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading ,popularCardData}) => {
  const theme = useTheme();
//  const [ data , setData]= useState(JSON.parse(localStorage.getItem('data')))
 const [data, setData]= useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [ dataValues , setDataValues] = useState([])
  const [ highestWorkingTasks, setHighestWorkingTasks]= useState({})
   const { week ,setWeek} = useContext(weekContext)
   const [ allMetrics , setAllMetrics] = useState({})
 let matchObj ={}
useEffect(()=>{
setAllMetrics(popularCardData)
setData(popularCardData)
},[popularCardData])

  useEffect(()=>{
    setHighestWorkingTasks({key:[],value:''})
  let arr=[]
    let maxValue =0
    let maxkey=''


if(Object.keys(allMetrics).length>0)
  {  
    // for(const [key,value] of Object.entries(allMetrics))
    // {
    //   if(value>=maxValue)
    //   {
    //     maxValue = value
    //     maxkey = key
    //     arr.push(maxkey)
    //   }
     
    // }


     setHighestWorkingTasks(keysWithMaxValue(allMetrics))
  }
  else{
  // setHighestWorkingTasks({key:[],value:''})
  }
// if(data?.length>0)
// {
//   data.map(row=>{
//     Object.keys(row).map(key=>{
//       if(key.trim()==="Week")
//       {
//         if(row[key]===week)
//         {setAllMetrics(row)
//           for(const[key,value] of Object.entries(row))
//           {if(key.trim().toLowerCase()!=="week" && key.trim().toLowerCase()!=="month")
//             if(value>maxValue)
//             {
//               maxValue=value
//               maxkey=key
//             }
//           }
//         }
//       }
//     })
//   })
 

// setHighestWorkingTasks( [{[maxkey]:maxValue}])
// }
},[allMetrics])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function keysWithMaxValue(obj) {
    // Get the maximum value in the object
    const max = Math.max(...Object.values(obj));
  
    // Filter the keys that have the maximum value
    const keysWithMax = Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value === max)
    );
    const replacedObj = {};
    for (const [key, value] of Object.entries(keysWithMax)) {
      const mappedKey = mappingNames[key] || key; // Use the mapped key from mappingNames, or use the original key if not found
      replacedObj[mappedKey] = value;
    }
    
    // console.log("replaced",replacedObj);
    return replacedObj;
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                 { Object.keys(allMetrics).length===0?<Grid item>
                    <Typography variant="h4"  >No Data to show</Typography>
                  </Grid>:<Grid item>
                    <Typography variant="h4"  >Majorly Worked</Typography>
                  </Grid>}
                  <Grid item>
                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
            
              </Grid>
              <Grid item xs={12}>
              
                  <Grid container direction="column" xs={12} md={6}>
                        <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      {/* <Grid item> */}
                        
                      {Object.keys(allMetrics).length>0&& Object.values(highestWorkingTasks)[0]!=0 && <Grid item >
                   
                        <TruncatedChip label={Object.keys(highestWorkingTasks).join(',')} />
                      </Grid>}
                    
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#69d2e7">
                         
                          {Object.values(highestWorkingTasks)[0]}
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 
                
                
                </Grid>
                {/* })} */}
              
               
                <Divider sx={{ my: 1.5 }} />
                {Object.keys(allMetrics).map((key)=>
                {if(key.trim().toLowerCase()!=="week" && key.trim().toLowerCase()!=="month")
                  return <><Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                        { Object.keys(mappingNames).map(objKey=>{
                          if(objKey==key)
                          {
                            return mappingNames[objKey]
                          }
                        })}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                            {allMetrics[key]}
                            </Typography>
                          </Grid>
                         
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />

                </>})}
                 
                 
                
              </Grid>
            </Grid>
          </CardContent>
         
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
