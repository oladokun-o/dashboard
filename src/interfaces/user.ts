export interface User {
	id: string;
	name: string;
	role: 'admin' | 'doctor' | 'vendor' | 'rider' | 'client';
	/**
	 * Upload a profile picture for the user.
	 */
	profilePicture?: Media | null;
	updatedAt: string;
	createdAt: string;
	email: string;
	resetPasswordToken?: string | null;
	resetPasswordExpiration?: string | null;
	salt?: string | null;
	hash?: string | null;
	loginAttempts?: number | null;
	lockUntil?: string | null;
	password?: string | null;
}

export interface Media {
	id: string;
	updatedAt: string;
	createdAt: string;
	url?: string | null;
	thumbnailURL?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	focalX?: number | null;
	focalY?: number | null;
}

export interface LoginSuccessResponse {
	exp: number;
	message: string;
	token: string;
	user: User;
}