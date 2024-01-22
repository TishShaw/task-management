import { Flex, Text, Button, useToast } from '@chakra-ui/react'

function App() {
  const toast = useToast();

  return (
    <Flex alignItems='center' flexDirection='column'>
     <Text fontSize='4xl'>Task Manager App!</Text>
     <Button colorScheme='pink' size='md' onClick={() => {
        toast({
            title: 'Task Created!',
            description: "You added a new task.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
     }}>Create Task</Button>
    </Flex>
  );
}

export default App;
