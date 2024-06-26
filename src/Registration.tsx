import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { registerUser } from './api/requests';
import { useLoading } from './utils/hooks';
import { Timer } from './types/Timer';
  
export const Registration = () => {
  const instructions = 'Email must have @ symbol and mailbox name after it. Password must be from 8 to 20 symbols and have at least one big letter and one number.';
  const [text, setText] = useState('E');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSectionVisible, setisSectionVisible] = useState(false);
  let timer1 = useRef<Timer | null>(null);
  let timer2 = useRef<Timer | null>(null);
  let interval = useRef<Timer | null>(null);
  const [message, setMessage] = useLoading(interval, '');
  
  const handleMessage = (errorMessage: string) => {
    for (let i = 1; i <= errorMessage.length + 1 ; i++) {
      timer2.current = setTimeout(() => {
        setMessage(errorMessage.slice(0, i));
      }, (i * 25))
    }
  };
  
  const register = async () => {
    setIsLoading(true);
  
    try {
      await registerUser(name, email, password);
  
      handleMessage('Activation email has been sent');
      setMessage('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (e: any) {
      if (e.response) {
        handleMessage(e.response.data.message);
      } else {
        handleMessage(e.message);
      }
    } finally {
      setIsLoading(false);
      clearInterval(interval.current as Timer);
      clearTimeout(timer2.current as Timer);
    }
  };
  
  const onRegister = () => {
    if (!name) {
      handleMessage('Please enter name');
    } else if (!email) {
      handleMessage('Please enter email');
    } else if (!password) {
      handleMessage('Please enter password');
    } else {
      register();
    }
  };
  
  useEffect(() => {
    setisSectionVisible(true);
 
    for (let i = 2; i <= instructions.length + 28 ; i++) {
      timer1.current = setTimeout(() => {
        if (i <= instructions.length) {
          setText(instructions.slice(0, i));
        } else if (i === instructions.length + 7) {
          setIsNameVisible(true);
        } else if (i === instructions.length + 14) {
          setIsEmailVisible(true);
        } else if (i === instructions.length + 21) {
          setIsPasswordVisible(true);
        } else if (i === instructions.length + 28) {
          setIsButtonVisible(true);
        }
      }, (i * 10))
    }
  
    return () => {
      clearTimeout(timer1.current as Timer);
      clearTimeout(timer2.current as Timer);
    };
  }, []);
  
  useEffect(() => {
    if (isLoading) {
      setMessage('...');
    }
  }, [isLoading, setMessage]);
  
  return (
    isSectionVisible ? (
      <section className="section">
      
        <div className='section__field'>
          <span className='section__title section__title--long'>REGISTRATION</span>

          <p className='section__text'>
            {text}
          </p>
  
          <input
            className={classNames(
              'section__input',
              { 'section__input--enabled': isNameVisible},
              { 'section__input--disabled': isLoading},
            )}
            type="text"
            placeholder='Enter name'
            value={name}
            disabled={isLoading}
            onChange={(event) => {
              if (name.length <= 20 && event.target.value.length <= 20) {
                setName(event.target.value);
                setMessage('');
              }
            }}
          />
  
          <input
            className={classNames(
              'section__input',
              { 'section__input--enabled': isEmailVisible},
              { 'section__input--disabled': isLoading},
            )}
            type="email"
            placeholder='Enter e-mail'
            value={email}
            disabled={isLoading}
            onChange={(event) => {
              if (email.length <= 30 && event.target.value.length <= 30) {
                setEmail(event.target.value);
                setMessage('');
              }
            }}
          />
 
          <input
            className={classNames(
              'section__input',
              { 'section__input--enabled': isPasswordVisible},
              { 'section__input--disabled': isLoading},
            )}
            type="password"
            placeholder='Enter password'
            value={password}
            disabled={isLoading}
            onChange={(event) => {
              if (password.length <= 20 && event.target.value.length <= 20) {
                setPassword(event.target.value);
                setMessage('');
              }
            }}
          />
        </div>
  
        <div className="section__container">
          <button
            className={classNames(
              'section__button',
              { 'section__button--enabled': isButtonVisible},
              { 'section__button--disabled': isLoading},
            )}
            disabled={isLoading}
            onClick={onRegister}
          >
            Submit
          </button>

          <div
            className={classNames(
              'section__error',
              { 'section__error--enabled': message || isLoading}
            )}
          >
            {`>${message}<`}
          </div>
        </div>
  
      </section>
    ) : (
      <></>
    )
  )
};
