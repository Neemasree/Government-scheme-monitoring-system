import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { User, Mail, Lock, Shield, Map, CheckSquare, Loader2, ArrowLeft } from 'lucide-react';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        district: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const districts = ['Salem', 'Coimbatore', 'Chennai', 'Madurai', 'Trichy', 'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Theni'];

    const roles = [
        { id: 'district_officer', title: 'District Officer', icon: <Map size={24} />, desc: 'Monitor district performance' },
        { id: 'field_officer', title: 'Field Officer', icon: <CheckSquare size={24} />, desc: 'Handle on-ground verification' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (roleId) => {
        setFormData({ ...formData, role: roleId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.role) {
            setError('Please select a role.');
            return;
        }

        if (formData.role !== 'admin' && !formData.district) {
            setError('Please select a district.');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/auth/register', formData);
            // Registration successful, redirect to login
            navigate('/login', { state: { message: 'Registration successful! Please login with your new credentials.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card glass-card animate-fade-in">
                <Link to="/login" className="back-link">
                    <ArrowLeft size={18} /> Back to Login
                </Link>

                <div className="register-header">
                    <div className="register-logo">🏛️</div>
                    <h2>Create Officer Account</h2>
                    <p>Join the Scheme Monitoring System</p>
                </div>

                {error && <div className="register-error-alert slideUp">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label><User size={16} /> Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><Mail size={16} /> Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="officer@govt.in"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><Lock size={16} /> Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                            />
                        </div>

                        <div className="form-group">
                            <label><Map size={16} /> District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select District</option>
                                {districts.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="role-selection-compact">
                        <p className="selection-label">Select Your Role</p>
                        <div className="role-row">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-option ${formData.role === role.id ? 'active' : ''}`}
                                    onClick={() => handleRoleSelect(role.id)}
                                >
                                    <div className="role-option-icon">{role.icon}</div>
                                    <div className="role-option-text">
                                        <h4>{role.title}</h4>
                                        <p>{role.desc}</p>
                                    </div>
                                    {formData.role === role.id && <div className="active-dot"></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Register Account'}
                    </button>
                </form>

                <div className="register-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
