import * as React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CircularProgress from "@mui/material/CircularProgress";

import Layout from "../components/Layout";
import { withProtected } from "../src/hooks/routes";
import styles from "../styles/Notification.module.css";
import { getData, useUserInformation } from "../auth/informationReducer";

const TextError = (props) => {
  return <div style={{ color: "red" }}>{props.children}</div>;
};

const Notification = () => {
  const { userInformationState, userInformationDispatch } =
    useUserInformation();
  const userInformation = {};
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const uid = userInformationState.userInformation?.uid;
    const tokens = userInformationState.userInformation?.tokens;

    const payload = {
      notification: {
        title: values.title,
        body: values.body,
      },
    };

    if (uid) {
      if (tokens.length === 0) {
        alert("No token found for this user");
        setLoading(false);
        return;
      }
      const makeApiCall = async () => {
        try {
          await axios
            .post("https://epviapi.in/sendNotification", {
              payload,
              tokens,
            })
            .then(function (response) {
              const res = response.data;
              console.log(res);
              const failureCount = res.Response1.failureCount;
              const successCount = res.Response1.successCount;
              alert(
                `${successCount} Notification send successfully && Invalid tokens found ${failureCount}`
              );
            });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };
      makeApiCall();
    } else {
      alert("No user found with this number");
    }
    setLoading(false);
  };

  const initialValues = {
    title: "",
    body: "",
    phone: "",
    uid: "",
    toAllUsers: false,
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    title: Yup.string().required("Please give notification title"),
    body: Yup.string().required("Please write notification body"),
    phone: Yup.string()
      .matches(phoneRegExp, "Please enter a valid phone number")
      .when("toAllUsers", {
        is: false,
        then: Yup.string()
          .required("Must enter a phone number")
          .max(10, "Please enter 10 digit phone number")
          .min(10, "Please enter 10 digit phone number"),
      }),
    toAllUsers: Yup.bool(),
  });

  return (
    <>
      <Layout userRole={"admin"}>
        <div className={styles.notification_form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              const handleFindUser = async () => {
                setLoading(true);
                const phoneNumber = formik.values.phone;
                await getData(
                  userInformationDispatch,
                  userInformation,
                  phoneNumber
                );
                setLoading(false);
              };
              return (
                <Form>
                  <div className={styles.notification_form_data}>
                    <div className={styles.notification_form_title}>
                      <div>
                        <label htmlFor="title">Title</label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title..."
                          required
                        />
                        <ErrorMessage name="title" component={TextError} />
                      </div>
                    </div>
                    <div className={styles.notification_form_body}>
                      <label htmlFor="body">Body</label>
                      <Field
                        as="textarea"
                        name="body"
                        type="text"
                        id="body"
                        placeholder="Enter notification content..."
                        required
                      />
                      <ErrorMessage name="body" component={TextError} />
                    </div>

                    {!formik.values.toAllUsers && (
                      <>
                        <div className={styles.notification_form_phone}>
                          <label htmlFor="phone_no">Phone number</label>
                          <Field
                            type="text"
                            id="phone_no"
                            name="phone"
                            placeholder="+91"
                          />
                          <ErrorMessage name="phone" component={TextError} />
                        </div>
                        <div>
                          <div className={styles.findUser}>
                            <button
                              type="button"
                              onClick={handleFindUser}
                              disabled={loading || !formik.isValid}
                            >
                              Find User
                            </button>
                            <Field
                              type="text"
                              readOnly
                              name="uid"
                              placeholder="User UID to Verify"
                              value={
                                userInformationState?.userInformation
                                  ? userInformationState?.userInformation?.uid
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className={styles.notification_form_checkbox}>
                      <Field type="checkbox" id="checkbox" name="toAllUsers" />
                      <ErrorMessage name="toAllUsers" component={TextError} />
                      <p>Select all users</p>
                    </div>

                    <div>
                      <button
                        className={
                          loading || !formik.isValid
                            ? styles.notification_form_btn_off
                            : styles.notification_form_btn_on
                        }
                        disabled={loading || !formik.isValid}
                        type="submit"
                      >
                        {loading ? (
                          <CircularProgress color="inherit" size={24} />
                        ) : (
                          "Send notification"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Layout>
    </>
  );
};

export default withProtected(Notification);
