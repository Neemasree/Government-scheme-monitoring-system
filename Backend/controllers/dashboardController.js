import Application from '../models/Application.js';
import Scheme from '../models/Scheme.js';

// @desc    Get dashboard summary stats
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    const totalSchemes = await Scheme.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingApprovals = await Application.countDocuments({ status: { $regex: /Pending/ } });
    const approvedCases = await Application.countDocuments({ status: 'Approved' });

    res.json({
        totalSchemes,
        totalApplications,
        pendingApprovals,
        approvedCases
    });
};

// @desc    Get analytics for charts
// @route   GET /api/dashboard/analytics
// @access  Private
const getAnalytics = async (req, res) => {
    // 1. Status Distribution
    const statusData = await Application.aggregate([
        { $group: { _id: "$status", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 2. Scheme Distribution
    const schemeData = await Application.aggregate([
        {
            $lookup: {
                from: 'schemes',
                localField: 'schemeId',
                foreignField: '_id',
                as: 'scheme'
            }
        },
        { $unwind: "$scheme" },
        { $group: { _id: "$scheme.schemeName", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    res.json({
        statusData,
        schemeData
    });
};

export { getDashboardStats, getAnalytics };
