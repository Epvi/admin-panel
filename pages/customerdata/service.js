import React from "react";
import Layout from "../../components/Layout";
import { withProtected } from "../../src/hooks/routes";

const Service = () => {
  return (
    <Layout userRole={"admin"}>
      <div>Service</div>
    </Layout>
  );
};

export default withProtected(Service);
