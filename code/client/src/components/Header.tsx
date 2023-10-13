import React from 'react';
import { useState } from 'react';
import { Burger } from '@mantine/core';
import { Avatar, Menu, Button } from '@mantine/core';
import { IconTrash, IconSettings, IconMessageCircle, IconOutlet } from '@tabler/icons-react';
import './Header.css';

interface HeaderProps {
  burgerOpened: boolean;
  toggleBurger: () => void;
}

export default function Header({ burgerOpened, toggleBurger }: HeaderProps) {
  //destruct
  const [menuOpened, setMenuOpened] = useState(false); //for user profile
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div>
      <div id="head">
        <div id="left_part">
          <Burger
            className="burger1"
            size="lg"
            opened={burgerOpened}
            onClick={toggleBurger}
            aria-label="Toggle navigation"
          />
          {/* <div id="image">
            <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"></img>
          </div> */}
          <div id="word">
            <h1> NoteAnt</h1>
          </div>
        </div>
        {/* <div id="search_part">
          <div id="search_part_son">
            <div id="search">
              <TextInput
                className="search_box"
                size="lg"
                placeholder="Search any files you want, my bro."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
              <button className="search-btn">Search</button>
            </div>
          </div>
        </div> */}
        <div id="account_part">
          <div id="account_part_son">
            <div id="user_profile">
              <Menu
                shadow="xs"
                width={120}
                opened={menuOpened}
                onClose={() => setMenuOpened(false)}
              >
                <Menu.Target>
                  <Avatar
                    component="button"
                    size="lg"
                    alt=""
                    onClick={toggleMenu}
                    src=" " //picture
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item
                    leftSection={<IconSettings style={{ width: '1rem', height: '1rem' }} />}
                  >
                    Personal
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IconOutlet style={{ width: '1rem', height: '1rem' }} />}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
