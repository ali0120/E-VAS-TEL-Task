import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { create } from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import ApexCharts from "react-apexcharts";

const Analytics = () => {
  const location = useLocation();
  const { engineerData = {} } = location.state || {};

  const { name, github, projects, timeline } = engineerData;

  const projectChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: projects.map((project) => project.name),
    },
  };

  const projectChartData = [
    {
      name: "Rank",
      data: projects.map((project) => project.rank),
    },
  ];

  const ProjectChart = () => (
    <ApexCharts
      options={projectChartOptions}
      series={projectChartData}
      type="bar"
      height={350}
    />
  );

  useEffect(() => {
    // Create the chart instance
    const chart = create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = timeline.map((item) => ({
      date: new Date(item.data),
      value: item.kpi,
    }));

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 35;

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineY.strokeWidth = 0;

    return () => {
      chart.dispose();
    };
  }, [timeline]);

  return (
    <div>
      <h1>{name}'s Analytics</h1>
      <Link to="/" state={{}}>
        Back to Engineers List
      </Link>
      <h2>GitHub Info</h2>
      <div>GitHub Username: {github.username}</div>
      <span>GitHub URL: </span><a href={github.url} target="_blank" rel="noopener noreferrer">{github.url}</a>
      <div>GitHub Followers: {github.followers}</div>
      <div>GitHub Following: {github.following}</div>
      <div>GitHub Location: {github.location}</div>
      <div>GitHub Last Contributions: {github.lastcontributions}</div>
      <h2>Projects</h2>
      <ProjectChart
        options={projectChartOptions}
        series={projectChartData}
        height={500}
      />
      <h2>Timeline</h2>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default Analytics;
