import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import Login from './login/Login';
import Register from './Register/Register';
import './App.css';
import { useState } from 'react';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, currentColor, themeSettings, setThemeSettings, activeMenu } = useStateContext();
  const [userstate, setUserState] = useState({});
  const isHomePage = window.location.pathname === '/';
  const isLoginPage = window.location.pathname === '/login';
  const isSignupPage = window.location.pathname === '/signup';

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const mainContentStyle = {
    width: activeMenu && !isLoginPage && !isSignupPage && !isHomePage ? '85%' : '100%', // Adjust the width as needed
    marginLeft: activeMenu && !isLoginPage && !isSignupPage && !isHomePage ? '15%' : '0',
    transition: 'width 0.3s ease, margin-left 0.3s ease',// Add transition for smooth animation
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {!isLoginPage && !isSignupPage && !isHomePage && activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          )}

          <div
            style={mainContentStyle}
            className={
              isLoginPage || isSignupPage || isHomePage
                ? 'w-full min-h-screen flex-2 dark:bg-main-dark-bg bg-main-bg'
                : 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
            }
          >
            {!isLoginPage && !isSignupPage && !isHomePage && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            )}
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route
                  path="/"
                  element={
                    userstate && userstate._id ? (
                      <Profile
                        setUserState={setUserState}
                        username={userstate.fname}
                      />
                    ) : (
                      <Login setUserState={setUserState} />
                    )
                  }
                ></Route>
                <Route
                  path="/login"
                  element={<Login setUserState={setUserState} />}
                ></Route>
                <Route path="/signup" element={<Register />} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
            </div>
            {!isLoginPage && !isSignupPage && !isHomePage && <Footer />}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
