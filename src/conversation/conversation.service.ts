import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus, Prisma } from '@prisma/client';
import { BookingDefaultSelectors,UserDefaultSelectors } from '../utils/constants/common-selectors.constant';
@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: Prisma.ConversationUncheckedCreateInput) {
    const conv = await this.findOne(dto.driverId,dto.userId)
    if(conv)
    {
      throw new BadRequestException('Conversation already exists')
    }
    return await this.prisma.conversation.create({
      data: {
        driverId : dto.driverId,
        userId: dto.userId,
        
      },
    });
  }

  async createMessage(dto: Prisma.MessageUncheckedCreateInput) {
    const conv = await this.findOne(dto.driverId,dto.userId)
    if(!conv)
    {
      throw new BadRequestException('Conversation not found exists')
    }
     await this.prisma.message.create({
      data: {
        driverId : dto.driverId,
        userId: dto.userId,
        'content':dto.content,
        'senderId':dto.senderId,
        'receiverId':dto.receiverId
      },
    });
    return await this.findOne(dto.driverId,dto.userId)
  }

 async findAll(userId:number) {
    return await this.prisma.conversation.findMany({
      where:{
        OR:[{
          driverId:userId
        },{userId:userId}]
      },
      include:{
        messages:{
          include:{
            sender:{
              select:UserDefaultSelectors
            },
            receiver:{select:UserDefaultSelectors}

          },

          orderBy:[{
            createdAt:'asc'
          }]

        },
        user:{select:UserDefaultSelectors},
        driver:{select:UserDefaultSelectors}
      }

    });
  }

 async findOne(driverId: number, userId: number) {
    return await this.prisma.conversation.findFirst({
      where: {
        driverId,
        userId
      },
      include:{
        messages:{
          include:{
            sender:{
              select:UserDefaultSelectors
            },
            receiver:{select:UserDefaultSelectors}

          },
          orderBy:[{
            createdAt:'asc'
          }]

        },
        user:{select:UserDefaultSelectors},
        driver:{select:UserDefaultSelectors}
      }
    });
  }

  async unReadConv(driverId: number, userId: number, reqUserId: number) {
    const conv  = await this.findOne(driverId,userId)
    if(!conv)
    {
      throw new BadRequestException('Conversation not found exists')
    }
    const messagesPromises = [  ]
    for (const message of conv.messages) {
      if (message.receiverId === reqUserId && message.isSeen === false) {
        messagesPromises.push(
          this.prisma.message.update({
            where: {
              id: message.id,
            },
            data: {
              isSeen: true,
            },
          }),
        );
      }
    }
    await Promise.all(messagesPromises);
    return await this.findOne(driverId,userId)
  }
}
