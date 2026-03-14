import { SkeletonCard } from '../Loading/Skeletons';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import './DashboardCards.css';

const StatCard = ({ title, value, icon, colorClass, delay = 0 }) => (
    <div
        className={`stat-card glass-card animate-fade-in ${colorClass}`}
        style={{ animationDelay: `${delay}s` }}
    >
        <div className="stat-content">
            <h3 className="stat-title">{title}</h3>
            <p className="stat-value">{value}</p>
        </div>
        <div className="stat-icon-wrapper">
            {icon}
        </div>
    </div>
);

const DashboardCards = ({ role, isLoading, stats }) => {
    const iconSize = 24;

    if (isLoading || !stats) {
        return (
            <div className="dashboard-cards-grid">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    const { totalSchemes, totalApplications, pendingApprovals, approvedCases } = stats;

    const adminCards = [
        { title: "Total Schemes", value: totalSchemes, icon: <FileText size={iconSize} />, colorClass: "blue-card", delay: 0 },
        { title: "Total Beneficiaries", value: totalApplications, icon: <Users size={iconSize} />, colorClass: "green-card", delay: 0.1 },
        { title: "Pending Approvals", value: pendingApprovals, icon: <Clock size={iconSize} />, colorClass: "amber-card", delay: 0.2 },
        { title: "Completed Cases", value: approvedCases, icon: <CheckCircle size={iconSize} />, colorClass: "purple-card", delay: 0.3 }
    ];

    const districtCards = [
        { title: "Active Schemes", value: totalSchemes, icon: <FileText size={iconSize} />, colorClass: "blue-card", delay: 0 },
        { title: "Applications", value: totalApplications, icon: <Users size={iconSize} />, colorClass: "green-card", delay: 0.1 },
        { title: "To Review", value: pendingApprovals, icon: <Clock size={iconSize} />, colorClass: "amber-card", delay: 0.2 },
        { title: "Approved Cases", value: approvedCases, icon: <CheckCircle size={iconSize} />, colorClass: "purple-card", delay: 0.3 }
    ];

    const fieldCards = [
        { title: "Assigned Cases", value: totalApplications, icon: <FileText size={iconSize} />, colorClass: "blue-card", delay: 0 },
        { title: "Total Approved", value: approvedCases, icon: <CheckCircle size={iconSize} />, colorClass: "green-card", delay: 0.1 },
        { title: "To Verify", value: pendingApprovals, icon: <Clock size={iconSize} />, colorClass: "amber-card", delay: 0.2 },
        { title: "Rejections", value: "0", icon: <Users size={iconSize} />, colorClass: "red-card", delay: 0.3 }
    ];

    let cardsToDisplay = adminCards;
    if (role === 'district') cardsToDisplay = districtCards;
    if (role === 'field') cardsToDisplay = fieldCards;

    return (
        <div className="dashboard-cards-grid">
            {cardsToDisplay.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
};

export default DashboardCards;
