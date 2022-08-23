import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addNewVideo, updateUserVideo } from "../services/videoServices";

export const addVideo = async (req: any, res: Response) => {
    const { id } = req.user.id;
    const { title, description, imgUrl, videoUrl } = req.body;

    const newVideo = await addNewVideo(id, title, description, imgUrl, videoUrl);

    if (newVideo.error) return res.status(StatusCodes.BAD_REQUEST).send(newVideo.message);

    return res.status(StatusCodes.CREATED).json(newVideo);
};

export const updateVideo = async (req: any, res: Response) => {
    const { id } = req.params.id;
    const { id: userId } = req.user;
    const { title, description, imgUrl, videoUrl } = req.body;

    const updatedVideo = await updateUserVideo(id, userId, title, description, imgUrl, videoUrl);

    if (updatedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(updatedVideo.message);

    if (updatedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(updatedVideo.message);

    if (updatedVideo?.error) return res.status(StatusCodes.BAD_REQUEST).send(updatedVideo.message);

    return res.status(StatusCodes.OK).json(updatedVideo);
};

export const deleteVideo = async (req: Request, res: Response) => {

};

export const getVideo = async (req: Request, res: Response) => {

};
