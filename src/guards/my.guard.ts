import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MyGuard extends AuthGuard('my-guard') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate() {
    return false;
  }
}
