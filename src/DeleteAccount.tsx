import { useEffect, useState, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useLoading } from './utils/hooks';
import { useAppSelector } from './app/hooks';
import { deleteUser, logoutUser } from './api/requests';
import { actions as logedUserActions } from './features/logedUser';
import { actions as refreshErrorActions } from './features/refreshError';
import { Timer } from './types/Timer';
     
export const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { logedUser } = useAppSelector(state => state.logedUser);
  const removeLogedUser = useCallback(() => dispatch(logedUserActions.removeLogedUser()), [dispatch]);
  const handleRefreshFail = useCallback(() => dispatch(refreshErrorActions.handleRefreshFail()), [dispatch]);
  const instructions = 'Enter "DELETE" to delete your account.';
  const [text, setText] = useState('E');
  const [deleteText, setDeleteText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  let timer1 = useRef<Timer | null>(null);
  let timer2 = useRef<Timer | null>(null);
  let interval = useRef<Timer | null>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useLoading(interval, '');
 
  const handleMessage = (errorMessage: string) => {
    for (let i = 1; i <= errorMessage.length + 1 ; i++) {
      timer2.current = setTimeout(() => {
        setMessage(errorMessage.slice(0, i));
      }, (i * 25))
    }
  };
 
  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      if (logedUser) {
        await deleteUser(logedUser.email, deleteText);
        await logoutUser();
        
        removeLogedUser();

        navigate('/successfully+deleted');
      }
    } catch (e: any) {
      if (e.response && e.response.status) {
        switch (e.response.status) {
          case 401:
            handleRefreshFail();
            break;
          default:
            handleMessage(e.response.data.message);
            break;
        }
      } else {
        handleMessage(e.message);
      }
    } finally {
      localStorage.removeItem('accessToken');
      setIsLoading(false);
      clearInterval(interval.current as Timer);
      clearTimeout(timer2.current as Timer);
    }
  };
  
  const onRename = () => {
    if (!deleteText) {
      handleMessage('Please enter text');
    } else {
      handleDelete();
    }
  }
  
  useEffect(() => {
    setIsSectionVisible(true);
  
    for (let i = 2; i <= instructions.length + 14 ; i++) {
      timer1.current = setTimeout(() => {
        if (i <= instructions.length) {
          setText(instructions.slice(0, i));
        } else if (i === instructions.length + 7) {
          setIsInputVisible(true);
        } else if (i >= instructions.length + 14) {
          setIsButtonVisible(true);
        }
      }, (i * 10))
    }
  
    return () => {
      clearTimeout(timer1.current as Timer);
      clearTimeout(timer2.current as Timer);
    }
  }, []);
  
  useEffect(() => {
    if (isLoading) {
      setMessage('...');
    }
  }, [isLoading, setMessage]);
  
  return (
    isSectionVisible ? (
      <section className="section section--profile">  
        <div className='section__field'>
          <div className='section__field-container'>
            <NavLink
              to={logedUser ? `/profile/${logedUser.id}` : '/error'}
              className={classNames(
                'section__button',
                'section__button--back',
                { 'section__button--enabled': isSectionVisible},
                { 'section__button--disabled': isLoading},
              )}
              onClick={(event) => {
                if (isLoading) {
                  event.preventDefault();
                }
              }}
            >
              {'<-'}
            </NavLink>
  
            <span className='section__title section__title--with-button'>DELETE ACCOUNT</span>
          </div>
  
          <p className='section__text'>
            {text}
          </p>
  
          <input
            className={classNames(
              'section__input',
              { 'section__input--enabled': isInputVisible},
              { 'section__input--disabled': isLoading},
            )}
            type="text"
            placeholder='Enter text here.'
            value={deleteText}
            disabled={isLoading}
            onChange={(event) => {
              if (deleteText.length <= 20 && event.target.value.length <= 20) {
                setDeleteText(event.target.value);
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
              onClick={onRename}
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
    