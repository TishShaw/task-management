import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, useToast, Input } from '@chakra-ui/react';
import axios from 'axios';

interface TaskEntity {
	id: number;
	description: string;
}

function App() {
	const [newTask, setNewTask] = useState('');
	const [tasks, setTasks] = useState<TaskEntity[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const addTask = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newTask.length < 1) {
			return;
		}

		if (editIndex !== null) {
			try {
				const updatedTask: TaskEntity = {
					id: tasks[editIndex].id,
					description: newTask,
				};

				await axios.put(
					`http://localhost:3000/api/tasks/${tasks[editIndex].id}`,
					updatedTask
				);

				const updatedTasks = [...tasks];
				updatedTasks[editIndex] = updatedTask;
				setTasks(updatedTasks);
				setNewTask('');
				setEditIndex(null);
			} catch (error) {
				console.error('Error updating task:', error);
			}
		} else {
			try {
				const res = await axios.post('http://localhost:3000/api/tasks', {
					description: newTask,
				});
				setTasks((prevState: TaskEntity[]) => [...prevState, res.data]);
				setNewTask('');
			} catch (error) {
				console.error('Error adding task:', error);
			}
		}
	};

	const updateTask = (index: number) => {
		setNewTask(tasks[index].description);
		setEditIndex(index);
	};

	const removeTask = async (index: number) => {
		try {
			await axios.delete(`http://localhost:3000/api/tasks/${tasks[index].id}`);
			const newTasks = [...tasks];
			newTasks.splice(index, 1);
			setTasks(newTasks);
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	console.log(tasks);

	useEffect(() => {
		axios.get('http://localhost:3000/api/tasks').then((res) => {
			setTasks(res.data);
		});
	}, []);

	return (
		<Flex
			alignItems='center'
			justifyContent='center'
			flexDirection='column'
			width='100%'
			h='100vh'
		>
			<Text fontSize='4xl'>Todo List</Text>
			<form>
				<Flex mb='10%' mt='20%'>
					<Text fontSize='20px' width='100%'>
						Create new task:
					</Text>
					<Input
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						variant='flushed'
						focusBorderColor='#e84393'
						placeholder='Go to the gym'
						size='md'
						mr='6%'
					/>
					<Button colorScheme='pink' size='md' onClick={addTask} w='50%'>
						Create Task
					</Button>
				</Flex>
			</form>

			{tasks.map((task, index) => (
				<div key={index}>
					<Flex mt='10px'>
						<span>{task.description}</span>
						<span
							onClick={() => removeTask(index)}
							style={{
								cursor: 'pointer',
								backgroundColor: 'brown',
								borderRadius: '10%',
								color: 'white',
								marginLeft: '10px',
								padding: '2px',
							}}
						>
							Delete
						</span>
						<span
							onClick={() => updateTask(index)}
							style={{
								cursor: 'pointer',
								backgroundColor: 'brown',
								borderRadius: '10%',
								color: 'white',
								marginLeft: '10px',
								padding: '2px',
							}}
						>
							Edit
						</span>
					</Flex>
				</div>
			))}
		</Flex>
	);
}

export default App;
