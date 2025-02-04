import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    console.log("Dashboard renderizado");
    return (
      <div className="dashboard-container">
        <h1>Relatórios Power BI</h1>
        <div className="report-container">
          <iframe
            title="INDICADORES_TI_GLPI"
            width="1140"
            height="541.25"
            src="https://app.powerbi.com/reportEmbed?reportId=ec3df829-037e-4b49-b853-5c540294bc05&autoAuth=true&ctid=86944b07-807b-457a-b4c7-5717ad5680a0"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    );
  };
  

export default Dashboard;
