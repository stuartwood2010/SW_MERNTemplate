import { Form, Field } from 'react-final-form';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from './graphql/mutations/createUser';
import { LOGIN } from './graphql/mutations/login';


export const Login = () => {
	const [loginMutation,] = useMutation(LOGIN);
	const navigate = useNavigate();

	return (
		<Form
			onSubmit={async (values) => {

				await loginMutation({
					variables: {
						...values,
					},
					onCompleted: (data) => {
						console.log(data);
						localStorage.setItem('token', data?.login?.token);
						navigate('/success');
					}
				});
			}}
			initialValues={{
				email: '',
				password: '',
			}}
			render={({values, handleSubmit, form}) => {

				return (
					<div>
						{/*<h1>FirstName</h1>*/}
						{/*<Field*/}
						{/*	name='firstName'*/}
						{/*	component='input'*/}
						{/*/>*/}
						{/*<h1>Last Name</h1>*/}
						{/*<Field*/}
						{/*	name='lastName'*/}
						{/*	component='input'*/}
						{/*/>*/}
						<h1>Email</h1>
						<Field
							name='email'
							component='input'
						/>
						<h1>Password</h1>
						<Field
							name='password'
							component='input'
							type='password'
						/>
						<button
							disabled={
								values?.password?.length === 0 || values?.email?.length === 0
							}
							onClick={async () => {
								await handleSubmit();
								form.reset();
							}}>
							Submit
						</button>
					</div>
				)
			}}
		/>

	)
}
