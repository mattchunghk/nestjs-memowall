import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { checkPassword } from 'utils/hash';

@Controller('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Req() req, @Res() res) {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
      res.status(400).json({
        message: 'Invalid username or password',
      });
      return;
    }
    const dbUser = await this.usersService.login(username);
    console.log(password);
    console.log(dbUser.password);
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
      return res.status(401).redirect('/login.html?error=Incorrect+Username');
    }
  }

  @Post('logout')
  logout(@Req() req) {
    req.session.destroy(() => {
      console.log('User logged out');
    });
  }
}
