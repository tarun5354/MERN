import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Users() {
    const users = useSelector(state => state.users.users);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className="btn btn-success btn-sm">
                    Add +
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                       <tr key={index}>
                        <td>{user.name}</td>
                         <td>{user.email}</td>
                        <td>{user.mobile}</td>
                      <td>{user.designation}</td>
                     <td>{user.gender}</td>
                     <td>{user.course ? user.course.join(', ') : ''}</td>
        <td>
            <button className='btn btn-sm btn-success'>Update</button>
            <button className='btn btn-sm btn-danger'>Delete</button>
        </td>
    </tr>
))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
