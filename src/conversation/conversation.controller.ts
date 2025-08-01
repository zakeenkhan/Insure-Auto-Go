import { Controller, Get, Post, Body, Patch, Param, Delete,
  Request,
  UseGuards,
  Query,
  ParseIntPipe,
  BadRequestException,
  ForbiddenException,
 } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import{CreateMessageDto} from './dto/createMessage.dto'
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isVerifiedUserGuard, JwtAuthGuard } from 'src/guards';

@ApiBearerAuth()
@ApiTags('Conversation')
@UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Request() req,@Body() dto: CreateConversationDto) {
    return this.conversationService.create({userId:req.user.id,driverId:dto.driverId});
  }

  @Post('message')
  createMessage(@Request() req,@Body() dto: CreateMessageDto) {
    const ids = dto.convId.split('-');
    if (ids.length !== 2) {
      throw new BadRequestException('Invalid id format. Expected format: userId-driverId');
    }

    const userId = parseInt(ids[0], 10);
    const driverId = parseInt(ids[1], 10);

    if (isNaN(userId) || isNaN(driverId)) {
      throw new BadRequestException('Invalid id format. Both userId and driverId should be integers.');
    }
    if(userId != req.user.id && driverId != req.user.id) throw new ForbiddenException('You are not allowed to send message in this conversation');
    return this.conversationService.createMessage({
      senderId: req.user.id,
      receiverId: req.user.id == userId ? driverId : userId,
      userId: userId,
      driverId: driverId,
      content:dto.content
    });
  }

  @Get()
  findAll(@Request() req,) {
    const userId = req.user.id;
    return this.conversationService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req,@Param('id') id: string) {
    const ids = id.split('-');
    if (ids.length !== 2) {
      throw new BadRequestException('Invalid id format. Expected format: userId-driverId');
    }

    const userId = parseInt(ids[0], 10);
    const driverId = parseInt(ids[1], 10);

    if (isNaN(userId) || isNaN(driverId)) {
      throw new BadRequestException('Invalid id format. Both userId and driverId should be integers.');
    }
    if(req.user.role !== 'admin')
    {if(userId != req.user.id && driverId != req.user.id) throw new ForbiddenException('You are not allowed to view this conversation');
    }
    return this.conversationService.findOne(driverId,userId);
  }

   @Patch('unread/:id')
  async unReadConv(@Request() req,@Param('id') id: string) {
    const ids = id.split('-');
    if (ids.length !== 2) {
      throw new BadRequestException('Invalid id format. Expected format: userId-driverId');
    }

    const userId = parseInt(ids[0], 10);
    const driverId = parseInt(ids[1], 10);

    if (isNaN(userId) || isNaN(driverId)) {
      throw new BadRequestException('Invalid id format. Both userId and driverId should be integers.');
    }
    return await this.conversationService.unReadConv(driverId,userId, req.user.id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.conversationService.remove(+id);
  // }
}
