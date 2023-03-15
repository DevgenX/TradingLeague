const UserImage = ({ user }) => {
  return (
    <div>
      {user && (
        <div className="badge-container">
          <img
            src={`../../assets/badge/${
              user.mmr > 2999
                ? `Quant`
                : user.mmr > 1799 && user.mmr < 3000
                ? `Degen`
                : user.mmr > 899 && user.mmr < 1800
                ? `Ape`
                : user.mmr > 349 && user.mmr < 900
                ? `Scalper`
                : "Fomo"
            }.svg`}
            className="badge-img"
            alt=""
          />
        </div>
      )}
    </div>
  );
};
export default UserImage;
