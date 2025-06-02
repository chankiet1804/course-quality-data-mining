import React, { useState } from 'react';
import './css/DatasetDashboard.css';

import StatCards from '../components/StatCards'; // phần tổng quan
import FeatureTable from '../components/FeatureTable';
import ProblemScoreDistribution from '../components/ProblemScoreDistribution';
import CommentPieChart from '../components/CommentPieChart';
import CourseBySchoolChart from '../components/CourseBySchoolChart';
import ExerciseVideoBar from '../components/ExerciseVideoBar';
import StudentLineChart from '../components/StudentLineChart';
import LabelCorrelationLineChart from '../components/LabelCorrelationLineChart';
import CommentCorrelationCharts from '../components/CommentCorrelationCharts';
import CourseQualityResult from '../components/CourseQualityResult';
import DataQuality from '../components/DataQuality';

import { commentByLabel } from '../data/commentByLabel'; // Dữ liệu cho biểu đồ tương quan

const tabs = ['Tổng quan', 'Tương quan', 'Kết quả dự đoán', "Chất lượng dữ liệu" ];

export default function DatasetDashboard() {
  const [activeTab, setActiveTab] = useState('Tổng quan');

  const renderContent = () => {
    switch (activeTab) {
      case 'Tổng quan':
        return (
          <>
            <StatCards />
            <FeatureTable />
            <ProblemScoreDistribution />
            <CourseBySchoolChart />
            <StudentLineChart />
          </>
        );
      case 'Kết quả dự đoán':
        return (
          <>
            <CourseQualityResult />
          </>
        );
      case 'Tương quan':
        return(
        <>    
          <LabelCorrelationLineChart />
          <CommentCorrelationCharts commentByLabel={commentByLabel} />
        </>
        );
      case 'Chất lượng dữ liệu':
        return(
        <>    
          <DataQuality />
        </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>
        <div>Dashboard</div>
        {activeTab === 'Tổng quan' && 'Phân tích tổng quan Dataset'}
        {activeTab === 'Tương quan' && 'Phân tích tương quan giữa các features và các labels'}
        {activeTab === 'Kết quả dự đoán' && 'Thể hiện kết quả dự đoán'}
        {activeTab === 'Chất lượng dữ liệu'}
      </h1>
      <div className="tab-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}