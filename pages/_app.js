import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "../auth/AuthContext";
import { ComplaintStateProvider } from "../auth/complaintReducer";
import { UserProvider } from "../auth/userReducer";
import "../styles/App.css";
import { TotalUserProvider } from "../auth/dashboardData";
import { DeviceProvider } from "../auth/devicesReducer";
import { RoomPinsProvider } from "../auth/roomPinsReducer";
import { SubStateProvider } from "../auth/subReducer";
import { UserInformationStateProvider } from "../auth/informationReducer";
import { PremiseUserStateProvider } from "../auth/premiseUserReducer";
import { PremiseRoomsStateProvider } from "../auth/premiseRoomsReducer";
import { TrackingLogsStateProvider } from "../auth/trackingLogsReducer";
import { SchedulesStateProvider } from "../auth/scheduleReducer";
import { SmifiInfoStateProvider } from "../auth/smifiReducer";
import { CouponsProvider } from "../auth/couponsReducer";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const userRole = "admin";
  // const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Head>
          <title>EPVI - Managing Electricity wisely</title>
        </Head>
        <AuthProvider>
          <ComplaintStateProvider>
            <UserProvider>
              <TotalUserProvider>
                <DeviceProvider>
                  <RoomPinsProvider>
                    <SubStateProvider>
                      <UserInformationStateProvider>
                        <PremiseUserStateProvider>
                          <PremiseRoomsStateProvider>
                            <TrackingLogsStateProvider>
                              <SchedulesStateProvider>
                                <SmifiInfoStateProvider>
                                  <CouponsProvider>
                                    {/* <Layout userRole={userRole}> */}
                                    {/* {getLayout(<Component {...pageProps} />)} */}
                                    <Component {...pageProps} />
                                  </CouponsProvider>
                                </SmifiInfoStateProvider>
                              </SchedulesStateProvider>
                            </TrackingLogsStateProvider>
                          </PremiseRoomsStateProvider>
                        </PremiseUserStateProvider>
                      </UserInformationStateProvider>
                    </SubStateProvider>
                  </RoomPinsProvider>
                </DeviceProvider>
              </TotalUserProvider>
            </UserProvider>
          </ComplaintStateProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
