package station.chargeStation.business.abstracts;

import java.util.List;

import station.chargeStation.entities.concretes.User;

public interface UserService {
	List<User> getAll();
	User findById(int userId);
	
	void update(User user, int userId);
	void add(User user);
	void delete(int id);
	Boolean payment(int price, String creditCart);
	String userValidation(String userName, String password);
	Boolean userValidationWebSite(User user);
	int postPriceWebSite(User user, int price);
}
