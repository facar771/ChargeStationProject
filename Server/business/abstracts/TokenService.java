package station.chargeStation.business.abstracts;

import station.chargeStation.entities.concretes.Token;

public interface TokenService {
	String createToken (String userName, String password);
	void add(Token token);
	public int validateToken(String token);
}
