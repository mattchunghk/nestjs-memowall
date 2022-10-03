import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { checkPassword } from 'utils/hash';
import { Response, Request } from 'express';

@Controller('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Res() res: Response, @Req() req: Request) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      if (!username || !password) {
        res.status(400).json({
          message: 'Invalid username or password',
        });
        return;
      }
      const dbUser = await this.usersService.login(username);
      if (!dbUser) {
        res.status(400).json({
          message: 'Invalid username or password',
        });
        return;
      }

      const match = await checkPassword(password, dbUser.password);
      if (match) {
        if (req.session) {
          req.session.name = dbUser.username;
          req.session.isLoggedIn = true;
          req.session.useId = dbUser.id;
          console.log('session');
        }
        console.log('login success');
        console.log(req.session);
        return res.redirect('/'); // To the protected page.
      } else {
        return res.status(401).redirect('/?error=Incorrect+Username');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy(() => {
      console.log('User logged out');
    });
  }

  @Post('register')
  async register(@Res() res: Response, @Req() req: Request) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !password) {
        console.log('Error: Invalid username or password');
        return res
          .status(400)
          .json({ message: 'Invalid username or password' });
      }

      const userResult = await this.usersService.login(username);

      if (userResult) {
        console.log('Error: Duplicate username');
        return res.status(400).json({ message: 'Duplicate username' });
      }
      // throw new Error('Duplicate username');

      await this.usersService.register(username, password);

      return res.status(200).json({ message: 'User created' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'User create Fail' });
    }
  }
}
