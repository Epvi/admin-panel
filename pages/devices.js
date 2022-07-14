import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';
import Connection from '../components/Connection';
import Publisher from '../components/Publisher';
import Subscriber from '../components/Subscriber';
import Receiver from '../components/Receiver';

export const QosOption = createContext([])
const qosOption = [
  {
    label: '0',
    value: 0,
  }, {
    label: '1',
    value: 1,
  }, {
    label: '2',
    value: 2,
  },
];

const Devices = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host,mqttOption));
    // console.log(host)
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false);
      });
    }
  };

  return (

      <div className='App'>

      <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectBtn={connectStatus} />
      <QosOption.Provider value={qosOption}>
        <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
        <Publisher publish={mqttPublish} />
      </QosOption.Provider>
      <Receiver payload={payload}/>
      </div>

  );
}

export default Devices;
// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { getData, useDevices } from "../auth/devicesReducer";
// import { useEffect } from "react";
// import Layout from "../components/Layout";
// const userRole = "admin";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function Devices() {
//   const { state, dispatch } = useDevices();

//   const deviceArray = [];
//   useEffect(() => {
//     getData(dispatch, deviceArray);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   // function createData(name, calories, fat, carbs, protein) {
//   //   return { name, calories, fat, carbs, protein };
//   // }
  
//   // const rows = [
//   //   createData('Pin 1', 'Pin 2', 'Pin 3', 'Pin 4', 'Pin 5','Pin 6'),
    
//   // ];
//   return (
//     <>
//       <div style={{ marginRight: "15px" }}>
//         <h1 style={{ textAlign: "center", marginTop: "20px" }}>
//           Devices Data
//         </h1>
//         <TableContainer component={Paper}>
//           <Table aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell sx={{ width: "4vw" }} align="center">
//                   Sr.
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                   Pin 1
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                   Pin 2
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                   Pin 3
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                   Pin 4
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                  Pin 5
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ width: "16vw" }} align="center">
//                  Pin 6
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {state.deviceArray?.map((row,index)=>(
//                 <StyledTableRow key={row.id}>
//                   <StyledTableCell align="center" component="th" scope="row">
//                       {index}        
//                   </StyledTableCell>
//                   <StyledTableCell align="center">{row["Pin 1"]}</StyledTableCell>
//                   <StyledTableCell align="center">
//                     {row["Pin 2"]}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {row["Pin 3"]}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {row["Pin 4"]}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">{row["Pin 5"]}</StyledTableCell>
//                   <StyledTableCell align="center">{row["Pin 6"]}</StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </>
//   );
// }

// Devices.getLayout = function getLayout(page) {
//   return <Layout userRole={userRole}>{page}</Layout>;
// };
