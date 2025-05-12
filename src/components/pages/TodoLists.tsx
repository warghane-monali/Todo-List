import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { ClipboardCheck, Trash2 } from "lucide-react"
import type { Todo } from "../types/todo"

function TodoLists() {

    // get Initial list from storage
    const getInitialTodos = (): Todo[] => {
        const stored = localStorage.getItem("todoList")
        return stored ? JSON.parse(stored) : []
    }

    const [inputValue, setInputValue] = useState("")
    const [checkBoxValue] = useState(false)
    const [data, setData] = useState<Todo[]>(getInitialTodos)

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(data))
    }, [data])

    // handle input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // On EnterKey
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const newData: Todo = {
                id: Date.now(),
                title: inputValue.trim(),
                completed: checkBoxValue
            }
            setData((prev) => [...prev, newData])
            setInputValue("")
        }
    }

    // onCheckbox Click
    const handleUpdateCheckBox = (index: number) => {
        let newData = [...data]
        newData[index].completed = !newData[index].completed
        setData(newData)
    }

    // onDelete Click
    const handleDeleteTodo = (index: number) => {
        const updatedData = [...data]
        updatedData.splice(index, 1)
        setData(updatedData)
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-grey-100 p-4">
            <div className="flex flex-row items-center gap-2 m-5">
                <ClipboardCheck size={26} color="green" />
                <h1 className="text-2xl text-black font-bold">Todo's</h1>
            </div>

            <div className="w-full max-w-xl px-4 mb-5">
                {/* Input Todo Field */}
                <input
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full rounded shadow"
                    placeholder="Enter your TODO's"
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            </div>

            {/* Todo lists */}
            <div className="w-full max-w-xl px-4 flex flex-col items-center gap-2">
                {data?.length ? (
                    data.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex w-full items-center justify-between gap-2 border rounded p-3 bg-white shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleUpdateCheckBox(index)}
                                    className="w-4 h-4"
                                />
                                <h3 className={`text-base ${item.completed ? "line-through text-gray-500" : "text-black"}`}>
                                    {item.title}
                                </h3>
                            </div>
                            <Trash2
                                size={20}
                                onClick={() => handleDeleteTodo(index)}
                                className="cursor-pointer hover:text-red-500"
                            />
                        </div>
                    ))
                ) : (
                    <h1 className="text-gray-600">No ToDo's Data</h1>
                )}
            </div>
        </div>

    )
}

export default TodoLists
