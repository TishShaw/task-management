import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, useToast, Input } from '@chakra-ui/react';

function App() {
	const toast = useToast();
	const [newTask, setNewTask] = useState('');
	const [tasks, setTasks] = useState<string[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	const addTask = (e: React.FormEvent) => {
		e.preventDefault();

		if (newTask.length < 1) {
			return;
		}

		if (editIndex !== null) {
			const updatedTasks = [...tasks];
			updatedTasks[editIndex] = newTask;
			setTasks(updatedTasks);
			setNewTask('');
			setEditIndex(null);
		} else {
			setTasks((prevState: string[]) => [...prevState, newTask]);
			setNewTask('');
		}
	};

	const updateTask = (index: number) => {
		setNewTask(tasks[index]);
		setEditIndex(index);
	};

	const removeTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	console.log(tasks);

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
						{task}{' '}
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
