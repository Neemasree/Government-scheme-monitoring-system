import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Scheme from '../models/Scheme.js';
import Application from '../models/Application.js';
import Notification from '../models/Notification.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Scheme.deleteMany();
        await Application.deleteMany();
        await Notification.deleteMany();

        console.log('🗑️  Data Cleared...');

        // 1. Create Users
        const users = await User.create([
            { name: 'Admin', email: 'admin@test.com', password: 'Admin@123', role: 'admin' },
            { name: 'District Officer', email: 'district@test.com', password: 'password123', role: 'district_officer', district: 'Salem' },
            { name: 'Field Officer', email: 'field@test.com', password: 'password123', role: 'field_officer', district: 'Coimbatore' },
        ]);

        console.log('👤 Users Seeded:');
        users.forEach(u => console.log(`   - ${u.name} (${u.role})`));

        // 2. Create Schemes
        const schemes = await Scheme.insertMany([
            {
                schemeName: 'Farmer Subsidy 2024',
                description: 'Direct financial aid for organic farming',
                budget: 5000000,
                district: 'Coimbatore',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
                createdBy: users[0]._id
            },
            {
                schemeName: 'Rural Housing Fund',
                description: 'Housing loans for low income families',
                budget: 12000000,
                district: 'Salem',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
                createdBy: users[0]._id
            },
            {
                schemeName: 'Education Scholarship',
                description: 'Monthly stipend for higher studies',
                budget: 3000000,
                district: 'Chennai',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
                createdBy: users[0]._id
            }
        ]);

        console.log('📋 Schemes Seeded');

        // 3. Create Applications
        await Application.insertMany([
            {
                beneficiaryName: 'Ravi Kumar',
                schemeId: schemes[0]._id,
                district: 'Coimbatore',
                status: 'Pending Field Officer',
                appliedDate: new Date('2024-03-01')
            },
            {
                beneficiaryName: 'Sita Rani',
                schemeId: schemes[1]._id,
                district: 'Salem',
                status: 'Pending District Officer',
                fieldOfficerApproval: { status: true, approvedBy: users[2]._id, date: Date.now() },
                appliedDate: new Date('2024-02-15')
            },
            {
                beneficiaryName: 'John Doe',
                schemeId: schemes[2]._id,
                district: 'Chennai',
                status: 'Approved',
                fieldOfficerApproval: { status: true, approvedBy: users[2]._id, date: Date.now() },
                districtOfficerApproval: { status: true, approvedBy: users[1]._id, date: Date.now() },
                adminApproval: { status: true, approvedBy: users[0]._id, date: Date.now() },
                appliedDate: new Date('2024-01-20')
            }
        ]);

        console.log('✅ Applications Seeded');
        console.log('--- DB INITIALIZATION COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
