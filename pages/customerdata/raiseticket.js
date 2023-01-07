import React from "react";
import Layout from "../../components/Layout";
import { withProtected } from "../../src/hooks/routes";

const RaiseTicket = () => {
  return (
    <Layout userRole={"admin"}>
      <div>Raise Ticket</div>
    </Layout>
  );
};

export default withProtected(RaiseTicket);
