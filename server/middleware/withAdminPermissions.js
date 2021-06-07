export default (req, res, next) => {
   
    req.isAdmin = req.user && req.user.data && req.user.data.role === 'admin';
    req.isSuperAdmin = req.user && req.user.data && req.user.data.role === 'superadmin';
    next();
}