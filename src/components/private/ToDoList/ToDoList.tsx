import React, { useState } from "react";
import {
    Checkbox,
    HStack,
    Icon,
    IconButton,
    Input,
    ScrollView,
    Text,
    VStack,
    View,
    useToast
} from "native-base";
import { AntDesign, Feather, } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import InputIconContainer from "../../common/InputIconContainer/InputIconContainer";


const ToDoList = () => {
    const [todoData, setTodoData] = useState<{ title: string, isCompleted: boolean }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const toast = useToast();

    const addItem = (title: string) => {
        if (title === "") {
            toast.show({
                title: "Please Enter Text",
            });
            return;
        }

        setTodoData([...todoData, { title, isCompleted: false }]);
    };

    const handleDelete = (index: number) => {
        setTodoData(prevList => {
            const temp = prevList.filter((_, itemI) => itemI !== index);
            return temp;
        });
    };

    const handleStatusChange = (index: number) => {
        setTodoData(prevList => {
            const newList = [...prevList];
            newList[index].isCompleted = !newList[index].isCompleted;
            return newList;
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 70, width: '100%', paddingHorizontal: 10, }}>
                    <HStack marginY={3}>
                        <Text fontSize="md">Today is {dayjs().format('dddd')}</Text>
                    </HStack>
                    <VStack space={4}>
                        <HStack space={2}>
                            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
                            <IconButton
                                borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                                    addItem(inputValue);
                                    setInputValue("");
                                }} />
                        </HStack>
                        <VStack space={2}>
                            <ScrollView>
                                {todoData?.length ? todoData.map((item, itemI) =>
                                    <HStack marginY={2} w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                                        <Checkbox
                                            accessibilityLabel={item.isCompleted ? "completed" : "uncompleted"}
                                            isChecked={item.isCompleted}
                                            onChange={() => handleStatusChange(itemI)}
                                            value={item.title} 
                                        />
                                        <Text
                                            fontSize="md"
                                            width="100%"
                                            flexShrink={1}
                                            textAlign="left"
                                            mx="2"
                                            strikeThrough={item.isCompleted}
                                            _light={{
                                                color: item.isCompleted ? "gray.400" : "coolGray.800"
                                            }}
                                            _dark={{
                                                color: item.isCompleted ? "gray.400" : "coolGray.50"
                                            }}
                                            onPress={() => handleStatusChange(itemI)}
                                        >
                                            {item.title}
                                        </Text>
                                        <InputIconContainer>
                                            <Icon as={AntDesign}
                                                name="delete"
                                                size="lg"
                                                color="red.500"
                                                onPress={() => handleDelete(itemI)}
                                            />
                                        </InputIconContainer>
                                    </HStack>
                                ) : null}
                            </ScrollView>
                        </VStack>
                    </VStack>
            </View>
        </SafeAreaView>
    );
};

export default ToDoList;