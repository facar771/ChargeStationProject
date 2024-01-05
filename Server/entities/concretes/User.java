package station.chargeStation.entities.concretes;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "userName")
	private String userName;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "name")
	private String name;	
	
	@Column(name = "lastname")
	private String lastname;	
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "phonenumber")
	private String phonenumber;
	
	@Column(name = "creditCart")
	private String creditCart;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "user")
    private ChargeStation chargeStation;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Reservation> reservations;
	
}