"use client";
import { useState, useEffect } from "react";

const defaultItems = [
    "Паспорт и документы",
    "Обменная карта",
    "Полис ОМС",
    "Бутылка воды",
    "Тапочки",
    "Ночная рубашка",
    "Одежда для малыша",
    "Подгузники для новорожденных",
    "Влажные салфетки",
    "Пеленки или плед"
];

const HospitalBagChecklist = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("hospitalBagChecklist") || "null");
        if (saved && Array.isArray(saved)) {
            setItems(saved);
        } else {
            const initialList = defaultItems.map(item => ({ text: item, checked: false }));
            setItems(initialList);
            localStorage.setItem("hospitalBagChecklist", JSON.stringify(initialList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("hospitalBagChecklist", JSON.stringify(items));
    }, [items]);

    const toggleItem = index => {
        const updated = [...items];
        updated[index].checked = !updated[index].checked;
        setItems(updated);
    };

    const resetList = () => {
        const reset = items.map(item => ({ ...item, checked: false }));
        setItems(reset);
    };

    const addNewItem = () => {
        if (newItem.trim() === "") return;
        const updated = [...items, { text: newItem.trim(), checked: false }];
        setItems(updated);
        setNewItem("");
    };

    const deleteItem = index => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow">
            <h1 className="text-center mt-md-5 mb-4">Чек-лист в роддом</h1>
            <p className="text-center text-muted mb-4">Отмечайте собранные вещи. Можно добавлять и удалять свои.</p>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control bg-body-secondary px-4 rounded-start-4 fs-5"
                    placeholder="Добавить свою вещь..."
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addNewItem()}
                />
                <button className="btn text-white rounded-end-4 fs-5" onClick={addNewItem} style={{ backgroundColor: "#ff2e54" }}>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>

            <ul className="list-group mb-4" style={{ userSelect: "none" }}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between align-items-center ${item.checked ? 'list-group-item-success' : ''}`}
                        style={{ userSelect: "none" }}
                    >
                        <span
                            onClick={() => toggleItem(index)}
                            style={{ flexGrow: 1, cursor: "pointer" }}
                        >
                            {item.text}
                        </span>

                        <div className="d-flex align-items-center gap-2 fs-5">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleItem(index)}
                            />
                            <button
                                className="btn btn-sm rounded-4 text-white ms-4"
                                onClick={() => deleteItem(index)}
                                title="Удалить"
                                style={{ backgroundColor: "#ff2e54" }}
                            >
                                <i className="bi bi-trash3 fs-5"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-center">
                <button onClick={resetList} className="btn btn-outline-secondary rounded-4">
                    Сбросить отметки
                </button>
            </div>
        </div>
    );
};

export default HospitalBagChecklist;
