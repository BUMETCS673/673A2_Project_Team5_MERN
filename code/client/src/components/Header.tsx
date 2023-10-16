import React from 'react';
import cx from 'clsx';
import classes from './HeaderTabs.module.css';
import { useState } from 'react';
import { Burger, UnstyledButton, rem, Text, Group } from '@mantine/core';
import { Avatar, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings, IconOutlet, IconChevronDown } from '@tabler/icons-react';
import './Header.css';
import picture1 from '../images/picture.jpg';

export default function Header() {
  //destruct
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = {
    name: 'Siyuan Wan',
    email: 'siyaunw@bu.edu',
    image: picture1,
  };

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div>
      <div id="head">
        <div id="left_part">
          <div id="word">
            <h1> NoteAnt</h1>
          </div>
        </div>
        <div id="account_part">
          <div id="account_part_son">
            <div id="user_profile">
              <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
              <Menu
                shadow="xs"
                width={120}
                opened={userMenuOpened}
                onOpen={() => setUserMenuOpened(true)}
                onClose={() => setUserMenuOpened(false)}
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Avatar src="user.name" alt="" radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {user.name}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
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
