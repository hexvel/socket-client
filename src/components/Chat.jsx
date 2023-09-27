import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";
import io from "socket.io-client";

import icon from "../assets/emoji.svg";
import styles from "../styles/Chat.module.css";

const socket = io("https://web-chat-5511.onrender.com");

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [params, setParams] = useState({ room: "", user: "" });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("left_room", { params });
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("send_message", { message, params });
    setMessage("");
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleChange = ({ target: { value } }) => setMessage(value);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{users} участников</div>
        <button className={styles.left} onClick={leftRoom}>
          Выйти из команты
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={messages} name={params.name} />
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Введите сообщение"
            value={message}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className={styles.emoji}>
          <img src={icon} alt="" onClick={() => setIsOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Отправить" />
        </div>
      </form>
    </div>
  );
};

export default Chat;
