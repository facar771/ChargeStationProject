package station.chargeStation.auth.abstracts;

public interface TokenServiceAuth {
	String generateToken(int userId, String role);
}