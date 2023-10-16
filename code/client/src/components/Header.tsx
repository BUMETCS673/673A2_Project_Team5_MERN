import { useState } from 'react';
import { UnstyledButton, rem, Text, Group } from '@mantine/core';
import { Avatar, Menu } from '@mantine/core';
import { IconSettings, IconOutlet, IconChevronDown } from '@tabler/icons-react';
import './Header.css';
import { user } from '../constants/user';

export default function Header() {
  //destruct
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <div className="head">
      <div>
        <h1>NoteAnt</h1>
      </div>
      <div>
        <Menu
          shadow="xs"
          width={120}
          opened={userMenuOpened}
          onOpen={() => setUserMenuOpened(true)}
          onClose={() => setUserMenuOpened(false)}
        >
          <Menu.Target>
            <UnstyledButton className="user">
              <Group gap={7}>
                <Avatar src="user.name" alt="" radius="xl" size={60} />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<IconSettings style={{ width: '1rem', height: '1rem' }} />}>
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
  );
}