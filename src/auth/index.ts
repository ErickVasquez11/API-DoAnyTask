const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import userModel from '../models/user.model';

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ])
        },
        async (payload: any, done: any) => {
            try {
                const user = await userModel.findById(payload._id);

                return done(null, user);
            }
            catch(err) {
                done(err)
            }
        }
    )       
)